const tooltipInstance = (
  <div style={{ height: 50 }}>
    <Portal show container={mountNode}>
      <Tooltip placement="right" positionLeft={150} positionTop={50}>
        <strong>Holy guacamole!</strong> Check this info.
      </Tooltip>
    </Portal>
  </div>
);

React.render(tooltipInstance, mountNode);
