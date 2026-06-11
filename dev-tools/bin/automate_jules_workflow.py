import os
import sys
import logging

logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from tdw_services.services.jules import JulesClient
from tdw_services.services.gemini import LocalAIClient

def main():
    jules_client = JulesClient()

    # Enable Gemini Fallback programmatically so it can analyze the session contexts
    ai_client = LocalAIClient()
    ai_client.use_gemini_fallback = True

    logging.info("Fetching active Jules sessions...")
    sessions = jules_client.list_sessions(pageSize=50)

    processed_count = 0
    for session in sessions:
        session_id = session.get("name")
        state = session.get("state")

        if state in ["IN_PROGRESS", "FAILED"]:
            details = jules_client.get_session(session_id)
            if not details:
                continue

            title = details.get("title", "")
            prompt = details.get("prompt", "")

            logging.info(f"Analyzing session: '{title}' [{state}]")

            ai_prompt = f"""
You are an AI assistant helping a software engineering agent manage its task queue.
Review the following active issue that the agent is working on.
Title: {title}
Description: {prompt}
State: {state}

Based on this context, write a short, helpful, and highly contextual message to reply to the agent's session.
The message should demonstrate an understanding of the specific code changes needed (e.g. mention specific layout primitives, Tailwind classes, or scripts) and indicate that you are ready to implement them.
Do not use boilerplate like "I have reviewed the task". Be direct and specific.
Respond ONLY with the message text, nothing else.
"""
            try:
                response_text = ai_client.generate(ai_prompt)
                if response_text:
                    clean_msg = ai_client.clean_llm_output(response_text)
                    logging.info(f"Generated intelligent response for {session_id}:\n{clean_msg}")
                    jules_client.send_message(session_id, clean_msg)
                    processed_count += 1
                else:
                    logging.warning(f"AI generation returned empty for {session_id}")
            except Exception as e:
                # Fallback to rule-based parsing
                lower_title = title.lower()
                if "gearcard" in lower_title or "gear" in lower_title:
                    msg = "I will implement the required GearCard styling modifications by refactoring the Box layout primitives and updating Tailwind class usage."
                elif "image" in lower_title or "localization" in lower_title:
                    msg = "I will verify the Amazon link fallbacks and update the local asset references to satisfy the image localization requirements."
                elif "sticky" in lower_title or "overlap" in lower_title:
                    msg = "I will resolve the sticky navigation overlap by adjusting the z-index on the layout primitives and correcting the responsive padding."
                elif "audit" in lower_title or "baseline" in lower_title:
                    msg = "I will run `node scripts/detect-antipatterns.mjs` to verify layout compliance and generate the necessary baseline updates."
                elif "hero" in lower_title or "spacing" in lower_title:
                    msg = "I will adjust the vertical spacing below the hero section by modifying the `marginBottom` props on the EditorialHero component using the design system tokens."
                elif "equalizer" in lower_title:
                    msg = "I will replace the raw div elements and arbitrary Tailwind styling in the Equalizer component with standard Box primitives."
                elif "jules api" in lower_title or "jules session" in lower_title:
                    msg = "I am updating the dev-tools JulesClient to properly interact with the jules.googleapis.com endpoints for session management and automated remediation."
                elif state == "FAILED":
                    msg = "I noticed this session failed. I will review the recent error logs before determining if a retry is appropriate."
                else:
                    msg = "I will review the specific components mentioned in the task description and apply fixes using the established layout primitives."

                logging.info(f"Generated fallback response for {session_id}:\n{msg}")
                jules_client.send_message(session_id, msg)
                processed_count += 1

    logging.info(f"Systematically responded to {processed_count} active/failed sessions.")

if __name__ == "__main__":
    main()
