export const CONTENT_METADATA_KEYS = [
  'type', 'slug', 'title', 'date', 'author', 'authorAvatar', 'category', 'excerpt',
  'content', 'image', 'tags', 'affiliateIds', 'rating', 'verdict', 'priceCategory',
  'updatedDate', 'durability', 'value', 'specs', 'location', 'city', 'schedule',
  'description', 'link', 'url', 'heroImage', 'whyAttending', 'startDate',
  'earlyBirdDate', 'registrationDeadline', 'hotelCutoffDate', 'packingReminderDate',
  'theme', 'gear', 'themeName', 'themeLabel', 'themeDescription', 'themeColors',
  'themeOutfitIds', 'themeAccessoryIds', 'gearOutfitIds', 'gearAccessoryIds',
  'gearShoeIds', 'gearEssentialIds', 'gearTravelIds', 'relatedEvents',
  'basePath', 'readingTime'
] as const;

export const LAYOUT_PROP_KEYS = [
  'padding', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'paddingX', 'paddingY',
  'margin', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight', 'marginX', 'marginY',
  'gap', 'border', 'smBorder', 'mdBorder', 'lgBorder', 'xlBorder',
  'surface', 'emphasis', 'radius', 'panel', 'flex', 'wrap', 'layout', 'shadow',
  'position', 'inset', 'width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight',
  'overflow', 'overflowX', 'overflowY', 'zIndex', 'opacity', 'display', 'aspect', 'shrink', 'self',
  'span', 'cursor', 'flexWrap', 'textAlign', 'bgGradient', 'justify', 'align',
  'scrollBehavior', 'scrollPaddingTop', 'scrollMarginTop', 'top', 'right', 'bottom', 'left'
] as const;

export const MOTION_PROP_KEYS = [
  'initial', 'animate', 'exit', 'transition', 'variants',
  'whileHover', 'whileTap', 'whileFocus', 'whileDrag', 'whileInView', 'viewport',
  'layout', 'layoutId', 'onAnimationStart', 'onAnimationComplete', 'onUpdate', 'custom'
] as const;
