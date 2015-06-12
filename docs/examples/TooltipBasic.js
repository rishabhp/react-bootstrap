const tooltipInstance = (
  <div style={{ height: 50 }}>
    <Tooltip show placement="right" positionLeft={150} positionTop={50} container={mountNode}>
      <strong>Holy guacamole!</strong> Check this info.
    </Tooltip>
  </div>
);

React.render(tooltipInstance, mountNode);
