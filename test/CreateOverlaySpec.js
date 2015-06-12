import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import createOverlay from '../src/CreateOverlay';

describe.only('CreateOverlay HoC', function () {
  let instance;

  let Overlay = createOverlay(props => props.overlay);

  afterEach(function() {
    var node;

    try { node = React.findDOMNode(instance) }
    catch (err){ /* not mounted */ }

    if (instance && ReactTestUtils.isCompositeComponent(instance) && node) {
      React.unmountComponentAtNode(node);
    }
  });

  it('Should render overlay into container (DOMNode)', function() {
    let container = document.createElement('div');

    instance = ReactTestUtils.renderIntoDocument(
      <Overlay container={container} overlay={<div id="test1" />} />
    );

    assert.equal(container.querySelectorAll('#test1').length, 1);
  });

  it('Should render overlay into container (ReactComponent)', function() {
    let Container = React.createClass({
      render() {
        return (
          <Overlay container={this} overlay={<div id="test1" />} >
            <div/>
          </Overlay>
        );
      }
    });

    instance = ReactTestUtils.renderIntoDocument(
      <Container />
    );

    assert.equal(React.findDOMNode(instance).querySelectorAll('#test1').length, 1);
  });

  it('Should not render a null overlay', function() {
    let Container = React.createClass({
      render() {
        return <Overlay ref='overlay' container={this} overlay={null} />;
      }
    });

    instance = ReactTestUtils.renderIntoDocument(
      <Container />
    );

    assert.equal(instance.refs.overlay.getOverlayDOMNode(), null);
  });

  it('Should render only an overlay', function() {

    let overlayInstance = ReactTestUtils.renderIntoDocument(
      <Overlay overlay={<div id="test1" />} />
    );

    assert.equal(overlayInstance.getOverlayDOMNode().nodeName, 'DIV');
    assert.equal(React.findDOMNode(overlayInstance), null);
  });
});
