const rule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce UX Consistency Playbook rules',
    },
    fixable: 'code',
  },
  create(context) {
    return {
      JsxOpeningElement(node) {
        const componentName = node.name.name;

        // Rule 1: One Card Contract - check CardImagePlaceholder or similar for constraints
        if (componentName === 'CardImagePlaceholder' || componentName === 'ContentCard' || componentName === 'GearCard' || componentName === 'Box') {
          const maxHeightAttr = node.attributes.find(attr => attr.name?.name === 'maxHeight');
          if (maxHeightAttr && maxHeightAttr.value?.type === 'Literal' && maxHeightAttr.value.value === '160px') {
             context.report({
               node: maxHeightAttr,
               message: 'Use "layout.cardImage.maxHeight" token instead of hardcoded "160px".',
             });
          }

          const aspectAttr = node.attributes.find(attr => attr.name?.name === 'aspect');
          if (aspectAttr && (componentName === 'ContentCard' || componentName === 'GearCard')) {
             context.report({
               node: aspectAttr,
               message: 'Card aspect ratio should be handled by CardImagePlaceholder primitive.',
             });
          }
        }

        // Rule 5: Typography casing
        if (componentName === 'Text') {
          const classNameAttr = node.attributes.find(attr => attr.name?.name === 'className');
          if (classNameAttr && classNameAttr.value?.type === 'Literal' && classNameAttr.value.value.includes('uppercase')) {
             context.report({
               node: classNameAttr,
               message: 'Use the "uppercase" prop instead of raw CSS classes on <Text>.',
             });
          }
        }
      },
    };
  },
};

export default {
  rules: {
    'ux-consistency': rule,
  },
};
