const positionerInstance = (
  <ButtonToolbar>
  <PopoverTrigger trigger='click' placement='bottom' title='Popover bottom' popover={[<strong>Holy guacamole!</strong>, ' Check this info.']}>
      <Button bsStyle='default'>Click</Button>
    </PopoverTrigger>
    <PopoverTrigger trigger='hover' placement='bottom' title='Popover bottom' popover={[<strong>Holy guacamole!</strong>, ' Check this info.']}>
      <Button bsStyle='default'>Hover</Button>
    </PopoverTrigger>
    <PopoverTrigger trigger='focus' placement='bottom' title='Popover bottom' popover={[<strong>Holy guacamole!</strong>, ' Check this info.']}>
      <Button bsStyle='default'>Focus</Button>
    </PopoverTrigger>
    <PopoverTrigger trigger='click' rootClose placement='bottom' title='Popover bottom' popover={[<strong>Holy guacamole!</strong>, ' Check this info.']}>
      <Button bsStyle='default'>Click + rootClose</Button>
    </PopoverTrigger>
  </ButtonToolbar>
);

React.render(positionerInstance, mountNode);
