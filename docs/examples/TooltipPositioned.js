const positionerInstance = (
  <ButtonToolbar>
    <OverlayTrigger overlay={
      <Tooltip placement='left'><strong>Holy guacamole!</strong> Check this info.</Tooltip>
    }>
      <Button bsStyle='default'>Holy guacamole!</Button>
    </OverlayTrigger>
    <OverlayTrigger overlay={
      <Tooltip placement='top'><strong>Holy guacamole!</strong> Check this info.</Tooltip>
    }>
      <Button bsStyle='default'>Holy guacamole!</Button>
    </OverlayTrigger>
    <OverlayTrigger overlay={
      <Tooltip placement='bottom'><strong>Holy guacamole!</strong> Check this info.</Tooltip>
    }>
      <Button bsStyle='default'>Holy guacamole!</Button>
    </OverlayTrigger>
    <OverlayTrigger overlay={
      <Tooltip placement='right'><strong>Holy guacamole!</strong> Check this info.</Tooltip>
    }>
      <Button bsStyle='default'>Holy guacamole!</Button>
    </OverlayTrigger>
  </ButtonToolbar>
);

React.render(positionerInstance, mountNode);
