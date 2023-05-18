const Card = {
  baseStyle: {
    p: '22px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    minWidth: '0px',
    wordWrap: 'break-word',
    backgroundClip: 'border-box',
    bg: 'white',
    width: '100%',
    boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
    borderRadius: '15px',
  },
  variants: {
    panel: (props: any) => ({
      bg: 'white',
      width: '100%',
      boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
      borderRadius: '15px',
    }),
  },
  defaultProps: {
    variant: 'panel',
  },
};

const CardBody = {
  baseStyle: {
    display: 'flex',
    width: '100%',
  },
};

const CardHeader = {
  baseStyle: {
    display: 'flex',
    width: '100%',
  },
};

export default { Card, CardBody, CardHeader };
