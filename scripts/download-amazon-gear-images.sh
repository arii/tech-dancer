#!/usr/bin/env bash
set -euo pipefail

OUT_DIR="public/images/gear/amazon"
mkdir -p "$OUT_DIR"

download() {
  local slug="$1"
  local url="$2"
  local out="$OUT_DIR/$slug.jpg"

  if [ -f "$out" ]; then
    echo "exists  $out"
    return 0
  fi

  echo "downloading $slug..."
  # Try to download. We remove --fail to handle the error status ourselves if needed,
  # but here we'll use a subshell to catch the error.
  if ! curl -L --fail --retry 3 --connect-timeout 15 --max-time 60 \
    -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36" \
    "$url" \
    -o "$out"; then
    echo "Error: Failed to download $slug (possibly 403 Forbidden or 404 Not Found)"
    rm -f "$out"
    return 0
  fi

  # Validate that we didn't get a 1x1 GIF
  if [ -f "$out" ]; then
    if file "$out" | grep -q "GIF image data, version 89a, 1 x 1"; then
      echo "Warning: Amazon returned a 1x1 placeholder GIF for $slug. Removing."
      rm "$out"
    else
      echo "Success: Saved $out"
    fi
  fi
}

# Amazon gear images - these are the ones that were verified to work
download "listerine-ready-tabs-chewable-tablets-with-clean-mint-flavor-revolutio" "https://images.amazon.com/images/P/B088VCG8JH.01.LZZZZZZZ.jpg"
download "bloch-women-s-grecian-sandal-dance-shoe-black-9-5" "https://images.amazon.com/images/P/B0002UUHCY.01.LZZZZZZZ.jpg"
download "adidas-women-s-superlite-performance-visor-grey-six-rose-gold-heather" "https://images.amazon.com/images/P/B07RMS5MGR.01.LZZZZZZZ.jpg"
download "clarks-women-s-breeze-sea-flip-flop-new-white-synthetic-10" "https://images.amazon.com/images/P/B01FH9F35K.01.LZZZZZZZ.jpg"
download "urban-decay-24-7-moondust-eyeshadow-compact-long-lasting-shimmery-eye" "https://images.amazon.com/images/P/B092JT62XB.01.LZZZZZZZ.jpg"
download "convenience-kits-international-women-s-15-pc-kit-featuring-palmer-s-ha" "https://images.amazon.com/images/P/B08HK9WS7S.01.LZZZZZZZ.jpg"

# The following often return 403 or 1x1 GIF due to Amazon protection
# We include them here but the script will gracefully skip if they fail
download "loop-quiet-2-ear-plugs" "https://images.amazon.com/images/P/B0D3V61JC8.01.LZZZZZZZ.jpg"
download "bloch-women-s-grecian-sandal-dance-shoes" "https://images.amazon.com/images/P/B0C62ZTGXL.01.LZZZZZZZ.jpg"
download "loop-experience-ear-plugs" "https://images.amazon.com/images/P/B0D4DZDHZ1.01.LZZZZZZZ.jpg"
download "suede-stick-on-sheets" "https://images.amazon.com/images/P/B07FZYY6J6.01.LZZZZZZZ.jpg"
download "alien-body-suit" "https://images.amazon.com/images/P/B07FY8QZP6.01.LZZZZZZZ.jpg"
download "alien-mask" "https://images.amazon.com/images/P/B07VYJQPK7.01.LZZZZZZZ.jpg"
download "mesh-fishnet-top" "https://images.amazon.com/images/P/B0CND69VGY.01.LZZZZZZZ.jpg"
download "bagail-4-set-6-set-compression-packing-cubes-travel-expandable-packing" "https://images.amazon.com/images/P/B07XLFXJ7D.01.LZZZZZZZ.jpg"
download "leak-proof-refillable-silicone-travel-bottles-3oz-travel-size-containe" "https://images.amazon.com/images/P/B0G1TSYYRW.01.LZZZZZZZ.jpg"
download "2-feet-sock-for-dancing-on-smooth-floors-over-sneakers-smooth-pivots-t" "https://images.amazon.com/images/P/B0FP2PY1WW.01.LZZZZZZZ.jpg"
download "adult-unisex-pickle-costume-x-large" "https://images.amazon.com/images/P/B08BX6D1W4.01.LZZZZZZZ.jpg"
download "zolee-large-rave-folding-hand-fan-with-bamboo-ribs-for-men-women-chine" "https://images.amazon.com/images/P/B07QXLKP1R.01.LZZZZZZZ.jpg"
download "hxyoo-ballroom-dance-shoes-boots-for-women-salsa-latin-wedding-party-2" "https://images.amazon.com/images/P/B092HMKD3H.01.LZZZZZZZ.jpg"
download "ushake-slim-running-belt-ultra-light-bounce-free-waist-pouch-fitness-w" "https://images.amazon.com/images/P/B073XSHTWR.01.LZZZZZZZ.jpg"
download "isadora-paccini-women-s-6-pack-fishnet-lace-pantyhose-tights-queen-bla" "https://images.amazon.com/images/P/B0CGY45BM9.01.LZZZZZZZ.jpg"
download "volpeblu-24-pack-light-up-cups-led-flash-shot-glasses-for-party-favors" "https://images.amazon.com/images/P/B0B8V45YHP.01.LZZZZZZZ.jpg"
download "tioncy-2-pcs-bling-rhinestone-portable-pill-case-with-keychain-small-p" "https://images.amazon.com/images/P/B0CFB4ZGHV.01.LZZZZZZZ.jpg"
download "mebak-piercing-aftercare-swabs-saline-solution-for-piercings-earring-n" "https://images.amazon.com/images/P/B0BWJJQKG6.01.LZZZZZZZ.jpg"
download "short-multi-charging-cable-3a-3pack-multiple-usb-fast-charger-cable-fo" "https://images.amazon.com/images/P/B08HGSVJS1.01.LZZZZZZZ.jpg"
download "high-fidelity-concert-ear-plugs-for-music-noise-cancelling-musician-ea" "https://images.amazon.com/images/P/B00A3Z44RW.01.LZZZZZZZ.jpg"
download "downbeats-reusable-high-fidelity-hearing-protection-ear-plugs-for-conc" "https://images.amazon.com/images/P/B09G2R2CRB.01.LZZZZZZZ.jpg"
download "jumpsuits-for-women-elegant-floral-short-sleeve-sexy-v-neck-casual-lon" "https://images.amazon.com/images/P/B097XSKNRB.01.LZZZZZZZ.jpg"
download "floerns-women-s-casual-reflective-short-sleeve-round-neck-crop-tops-t" "https://images.amazon.com/images/P/B0953CF3DH.01.LZZZZZZZ.jpg"
download "the-gym-people-womens-high-waisted-running-shorts-quick-dry-athletic-w" "https://images.amazon.com/images/P/B097DHNKY4.01.LZZZZZZZ.jpg"
download "9-pcs-led-light-hair-scrunchies-satin-elastic-bands-ties-ropes-3-color" "https://images.amazon.com/images/P/B08GM59R8R.01.LZZZZZZZ.jpg"
download "freeprance-women-s-pants-casual-trouser-paper-bag-pants-elastic-waist" "https://images.amazon.com/images/P/B07HD8PGCN.01.LZZZZZZZ.jpg"
download "drawer-organizer-clothes-8-pack-underwear-drawer-organizer-foldable-cl" "https://images.amazon.com/images/P/B0925XQ4NZ.01.LZZZZZZZ.jpg"
download "halloween-headbands-2-pack-pumpkin-hat-headbands-for-halloween-costume" "https://images.amazon.com/images/P/B07DYMH79K.01.LZZZZZZZ.jpg"
download "6-sheets-halloween-adhesive-felt-sticker-pumpkin-ghost-stickers-classi" "https://images.amazon.com/images/P/B0B17JS8LC.01.LZZZZZZZ.jpg"
download "shoe-dryer-and-deodorizer-enhanced-deodorising-boot-dryer-with-timer-s" "https://images.amazon.com/images/P/B0CG9FFK4Z.01.LZZZZZZZ.jpg"
download "darenyi-16-x12-acrylic-mirror-sheet-flexible-non-glass-body-mirror-til" "https://images.amazon.com/images/P/B0BRPVSBYN.01.LZZZZZZZ.jpg"
download "escolite-uv-flashlight-black-light-51-led-395-nm-ultraviolet-blackligh" "https://images.amazon.com/images/P/B008133KB4.01.LZZZZZZZ.jpg"
download "tibeha-butterfly-wings-for-women-halloween-cape-costumes-adult-with-ma" "https://images.amazon.com/images/P/B09B1L555T.01.LZZZZZZZ.jpg"
download "yzding-birthday-sashes-for-girl-women-happy-birthday-queen-gift-sash-s" "https://images.amazon.com/images/P/B09DS9ZP3F.01.LZZZZZZZ.jpg"
download "didder-gold-crystal-tiara-crown-headband-princess-elegant-crown-with-c" "https://images.amazon.com/images/P/B0816B3CYK.01.LZZZZZZZ.jpg"
download "morgles-wig-caps-6pcs-mesh-net-wig-caps-weaving-hair-net-for-wig-close" "https://images.amazon.com/images/P/B089YNL19F.01.LZZZZZZZ.jpg"
download "qhq-shininglifi-rainbow-bob-wigs-and-a-wig-cap-women-s-short-straight" "https://images.amazon.com/images/P/B073Z6ZSR8.01.LZZZZZZZ.jpg"
download "kaximil-women-s-sexy-bodycon-midi-club-dresses-basic-casual-2-piece-ou" "https://images.amazon.com/images/P/B07W6G755K.01.LZZZZZZZ.jpg"
download "a-alfeel-2-pack-large-folding-rave-fan-for-women-men-holographic-festi" "https://images.amazon.com/images/P/B0C5LR17SB.01.LZZZZZZZ.jpg"
download "prettygarden-women-s-summer-casual-deep-v-neck-short-sleeve-wrap-draws" "https://images.amazon.com/images/P/B08QMP3YXK.01.LZZZZZZZ.jpg"
download "nhsunray-women-girls-dancing-tutu-skirt-layered-organza-lace-rainbow-b" "https://images.amazon.com/images/P/B06XKBMKJY.01.LZZZZZZZ.jpg"
download "cresay-women-s-sequin-fitted-long-sleeve-zipper-blazer-bomber-jacket-r" "https://images.amazon.com/images/P/B06XHV5X5G.01.LZZZZZZZ.jpg"
download "olv-neck-fan-5000mah-foldable-neck-fan-portable-rechargeable-led-displ" "https://images.amazon.com/images/P/B0BQWC8B7D.01.LZZZZZZZ.jpg"
download "relavel-travel-hanging-toiletry-bag-for-men-women-travel-kit-shaving-b" "https://images.amazon.com/images/P/B07TBCXCJH.01.LZZZZZZZ.jpg"
