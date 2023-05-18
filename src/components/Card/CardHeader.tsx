import { Box, useStyleConfig } from '@chakra-ui/react';

export function CardHeader(props: any) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig('CardHeader', { variant });
  // Pass the computed styles into the `__css` prop
  return (
    <Box sx={styles} {...rest}>
      {children}
    </Box>
  );
}
