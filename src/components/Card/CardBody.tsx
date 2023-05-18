import { Box, useStyleConfig } from '@chakra-ui/react';

export function CardBody(props: any) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig('CardBody', { variant });

  return (
    <Box sx={styles} {...rest}>
      {children}
    </Box>
  );
}
