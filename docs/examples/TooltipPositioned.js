const positionerInstance = (
  <ButtonToolbar>
    <TooltipTrigger placement='left' tooltip={[<strong>Holy guacamole!</strong>, 'Check this info.']}>
      <Button bsStyle='default'>Holy guacamole!</Button>
    </TooltipTrigger>
    <TooltipTrigger placement='top' tooltip={[<strong>Holy guacamole!</strong>, 'Check this info.']}>
      <Button bsStyle='default'>Holy guacamole!</Button>
    </TooltipTrigger>
    <TooltipTrigger placement='bottom' tooltip={[<strong>Holy guacamole!</strong>, 'Check this info.']}>
      <Button bsStyle='default'>Holy guacamole!</Button>
    </TooltipTrigger>
    <TooltipTrigger placement='right' tooltip={[<strong>Holy guacamole!</strong>, 'Check this info.']}>
      <Button bsStyle='default'>Holy guacamole!</Button>
    </TooltipTrigger>
  </ButtonToolbar>
);

React.render(positionerInstance, mountNode);
