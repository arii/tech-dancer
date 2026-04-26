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
        if (componentName === 'CardImagePlaceholder' || componentName === 'ContentCard' || componentName === 'GearCard') {
          // In a real implementation, we'd check if they are missing the shared primitive
          // For now, let's check for raw aspect ratio overrides that should be handled by the primitive
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
