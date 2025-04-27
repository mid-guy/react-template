import { ComponentType, forwardRef } from 'react';

/**
 * A Higher-Order Component (HOC) that enhances components with additional functionality
 * 
 * @param BaseComponent - The component to be enhanced
 * @param enhancer - Function that adds additional props or behavior to the component
 * @returns A new component with enhanced functionality
 */
export function withComponent<
  BaseProps extends object,
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  EnhancedProps extends object = {}
>(
  BaseComponent: ComponentType<BaseProps>,
  enhancer: (props: BaseProps & EnhancedProps) => Partial<BaseProps>
) {
  const WithComponent = forwardRef<HTMLElement, BaseProps & EnhancedProps>(
    (props, ref) => {
      // Apply the enhancer to add or modify props
      const enhancedProps = enhancer(props as BaseProps & EnhancedProps);

      // Properly merge className props if they exist
      if ('className' in props && 'className' in enhancedProps) {
        const mergedClassName = `${enhancedProps.className} ${props.className}`;
        const mergedProps = {
          ...props,
          ...enhancedProps,
          className: mergedClassName
        };
        return <BaseComponent {...mergedProps as BaseProps} ref={ref} />;
      }

      // Otherwise just merge the props as before
      const mergedProps = { ...props, ...enhancedProps };
      return <BaseComponent {...mergedProps as BaseProps} ref={ref} />;
    }
  );

  // Set display name for debugging
  WithComponent.displayName = `withComponent(${BaseComponent.displayName || BaseComponent.name || 'Component'})`;

  return WithComponent;
}