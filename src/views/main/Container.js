import React, { PropTypes as T } from 'react'
import {Col,  Grid, Row } from 'react-bootstrap';
import Header from 'components/Header/Header'
import styles from './styles.module.css'

export class Container extends React.Component {
  renderChildren() {
    const childProps = {
      ...this.props
    };
    const {children} = this.props;
    return React.Children.map(children,
              c => React.cloneElement(c, childProps));
  }
  render() {
    return (
      <Grid fluid={true}>
        <Row>
          <Col lg={8} lgOffset={2} md={8} mdOffset={2} xs={10} xsoffset={1} >
              <Header tite="play" />
              <div className={styles.content}>
                {this.renderChildren()}
              </div>
          </Col>
        </Row>
      </Grid>
    )
  }
}

Container.contextTypes = {
  router: T.object
}

export default Container
