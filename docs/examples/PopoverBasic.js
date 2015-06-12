const popoverInstance = (
  <div style={{ height: 120 }}>
    <Popover show placement='right' positionLeft={200} positionTop={50} title='Popover right' container={mountNode}>
      And here's some <strong>amazing</strong> content. It's very engaging. right?
    </Popover>
  </div>
);

React.render(popoverInstance, mountNode);
