class Toolbar extends React.Component {
  constructor(props, context){
    super(props, context);
    this.state = { open: false };
  }
  render(){
    return (
      <ButtonToolbar>
        <Button bsStyle='default'
          onClick={ e => this.setState({ open: !this.state.open, target: e.target })}
        >
          Holy guacamole!
        </Button>
        <Popover
          show={this.state.open}
          container={mountNode}
          target={()=> this.state.target}
          containerPadding={20}
          placement='bottom'
          title='Popover bottom'
        >
          <strong>Holy guacamole!</strong> Check this info.
        </Popover>
      </ButtonToolbar>
    );
  }
}


React.render(<Toolbar/>, mountNode);
