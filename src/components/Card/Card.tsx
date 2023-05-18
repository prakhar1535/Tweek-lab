import { Box, useStyleConfig } from '@chakra-ui/react';

export function Card(props: any) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig('Card', { variant });

  return (
    <Box sx={styles} {...rest}>
      {children}
    </Box>
  );
}
