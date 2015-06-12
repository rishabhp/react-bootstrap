const positionerInstance = (
  <ButtonToolbar>
    <PopoverTrigger container={mountNode} trigger='click' placement='left' title='Popover left' popover={[<strong>Holy guacamole!</strong>, ' Check this info.']}>
      <Button bsStyle='default'>Holy guacamole!</Button>
    </PopoverTrigger>
    <PopoverTrigger container={mountNode} trigger='click' placement='top' title='Popover top' popover={[<strong>Holy guacamole!</strong>, ' Check this info.']}>
      <Button bsStyle='default'>Holy guacamole!</Button>
    </PopoverTrigger>
    <PopoverTrigger container={mountNode} trigger='click' placement='bottom' title='Popover bottom' popover={[<strong>Holy guacamole!</strong>, ' Check this info.']}>
      <Button bsStyle='default'>Holy guacamole!</Button>
    </PopoverTrigger>
    <PopoverTrigger container={mountNode} trigger='click' placement='right' title='Popover right' popover={[<strong>Holy guacamole!</strong>, ' Check this info.']}>
      <Button bsStyle='default'>Holy guacamole!</Button>
    </PopoverTrigger>
  </ButtonToolbar>
);

React.render(positionerInstance, mountNode);
