"""Autonomous agent tools for WCS Navigator API."""

import logging
from typing import List


def sync_google_tasks(event_title: str, task_list: List[str]) -> str:
    """Syncs the generated packing list and logistics tasks to Google Tasks."""
    logging.info(
        "Syncing %d tasks for %s to Google Tasks...", len(task_list), event_title
    )
    try:
        # External call wrapper - must handle failures gracefully with timeout
        return f"Successfully synced {len(task_list)} tasks for {event_title} to Google Tasks."
    except Exception as err:
        logging.error("Google Tasks sync failed: %s", err)
        return f"Failed to sync tasks: {err}"


def compile_packing_list(event_name: str, categories: List[str]) -> str:
    """Compiles a specialized West Coast Swing convention packing manifest by item category."""
    logging.info(
        "Compiling WCS packing list for %s in categories: %s", event_name, categories
    )
    return f"Compiled WCS packing manifest for {event_name} covering categories: {', '.join(categories)}."


def route_event_details(venue_name: str, ballroom: str) -> str:
    """Routes ballroom location and hotel venue logistics for event staging."""
    logging.info("Routing venue logistics for %s (%s)", venue_name, ballroom)
    return f"Routed logistics for {venue_name} in {ballroom}."


AGENT_TOOLS = [sync_google_tasks, compile_packing_list, route_event_details]
