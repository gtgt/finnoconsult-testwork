import React, { Component, PropTypes } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import NavBarOwner from '../demo/NavBarOwner';
import FormDemo from '../demo/Form';
import GridDemo from '../demo/Grid';
import CarouselDemo from '../demo/CarouselDemo';
import DragDemoContainer from '../demo/DragDemoContainer';
import TransferDemoContainer from '../demo/TransferDemoContainer';

import Page from '../components/page/Page';
import StaticImagePage from '../components/page/StaticImagePage';
import { DraggableIndicator } from '../components/draggable';

import { links } from '../content';

@withRouter
export default class PageContainer extends Component {
  static propTypes = {
    history: PropTypes.shape({
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string.isRequired,
    }).isRequired,
  }

  // componentDidMount()a {
  // }
  // componentDidUpdate(prevProps) {
  //   this.checkScrolling(prevProps);
  // }

  setScrollAnchor(e) {
    this.mainPage = e;
  }

  // checkScrolling(prevProps) {
  //   if (prevProps.location.pathname !== this.props.location.pathname && this.mainPage) {
  //     // console.log('routing occurred from ', this.props.location.pathname, 'to', prevProps.location.pathname, this.mainPage);
  //     this.mainPage.scrollIntoView(true);
  //     setTimeout(() => window.scrollTo(0, 0), 10);
  //   }
  // }

  get routerHistory() {
    return this.props.history;
  }

  render() {
    const isHomeMatching = this.props.location.pathname.match(/^\/$/g) !== null;
    return (
      <div>
        {/* TODO: */}
        {/* <ActionSheetContainer isOverlayVisible={isOverlayVisible} /> */}
        <DraggableIndicator />

        <Route
          path="*/pages"
          render={() => (
            <Page setScrollAnchor={e => this.setScrollAnchor(e)} isHomeLocation={isHomeMatching}>
              <div>
                <iframe
                  width="100%"
                  height="100%"
                  src={links.functions.getLink(links.items, this.props.location.search)}
                  // src={links.items.find(i => i.id === parseInt(this.props.location.search && this.props.location.search.match(/\?(\d+)/)[1], 10) || 0).link}
                />
              </div>
            </Page>
          )}
        />

        <Route
          path="*/demo"
          render={({ location }) => (
            <Page setScrollAnchor={e => this.setScrollAnchor(e)} isHomeLocation={isHomeMatching}>
              <TransitionGroup>
                <CSSTransition key={location.key} classNames="pageTransition" timeout={500}>
                  <Switch location={location}>
                    <Route path="*/demo/navbar" exact component={NavBarOwner} />
                    <Route path="*/demo/form" exact component={FormDemo} />
                    <Route path="*/demo/grid" exact component={() => <GridDemo pageTitle="I'm a *hacked* Grid from PageContainer!" />} />
                    <Route path="*/demo/carousel" exact component={CarouselDemo} />
                    <Route path="*/demo/drag-drop" exact component={DragDemoContainer} />
                    <Route path="*/demo/transfer/:from/:to" exact component={TransferDemoContainer} />

                    <Route
                      path="*/demo/images"
                      exact
                      component={() => (
                        <StaticImagePage
                          pageTitle="Switching through 2 images"
                          images={[
                            { source: 'https://finnoconsult.at/img/logo.svg' },
                            { source: 'https://media.finnoconsult.at/2018/05/C18_Web_Nominiert-Mobile-Apps.png' },
                          ]}
                        >
                          <h2>Click the image / or swipe left-right</h2>
                        </StaticImagePage>
                      )}
                    />

                    <Route
                      path="*/demo/text"
                      render={() => (
                        <div>
                          <h1>Pudding gummies oat cake.</h1>
                          <h2>TODO: instructions</h2>
                          <p>
                            Muffin gingerbread jujubes jelly brownie cheesecake cupcake jujubes. Carrot cake powder gummi bears marzipan. Gummies sweet cake dessert macaroon croissant jujubes. Liquorice gingerbread gummi bears sweet roll chocolate bar. Lollipop I love bonbon. Fruitcake pudding cotton candy croissant candy ice cream icing oat cake. Oat cake lollipop chupa chups lemon drops pudding tart pastry. Tootsie roll I love marshmallow tart cupcake I love lemon drops cheesecake. Marzipan bonbon I love. Gummies ice cream lollipop pudding oat cake chupa chups bonbon cupcake. Halvah oat cake dragée I love sesame snaps sugar plum dessert pastry cake. Gingerbread I love toffee pie. Caramels cheesecake oat cake bear claw cotton candy sugar plum fruitcake donut.</p>

                          <p>
                            Danish pastry cake lemon drops icing muffin candy pastry jelly beans. Cookie danish tootsie roll tootsie roll topping marzipan tootsie roll muffin ice cream. I love chocolate cake jelly-o tootsie roll muffin jelly beans marzipan. Dessert topping chocolate cake cookie wafer sweet roll candy wafer pie. Cookie I love marzipan cupcake. Brownie lemon drops I love chocolate powder. Jelly beans topping I love I love. Lollipop bonbon pastry. Brownie candy canes I love sugar plum jelly-o carrot cake lollipop halvah sugar plum. Marzipan liquorice brownie lemon drops. Cake I love brownie. Sesame snaps biscuit danish muffin biscuit gingerbread donut danish cotton candy.
                          </p>

                          <p>
                            Topping I love dessert. Tootsie roll chocolate candy pudding oat cake cookie fruitcake. I love gummi bears bonbon. Chocolate cake sesame snaps topping gummi bears gummi bears I love. Halvah jelly-o gummies icing. Cheesecake liquorice chocolate cake danish. Cupcake candy lollipop. Icing jelly-o chupa chups wafer cookie croissant I love fruitcake cheesecake. Cake chocolate cake I love dessert cotton candy. Sesame snaps lemon drops cake lollipop chupa chups carrot cake I love. Oat cake liquorice sweet roll jelly beans dessert. Bear claw pie lollipop. Sweet roll muffin tart topping fruitcake cake.
                          </p>

                          <p>
                            Croissant candy canes gummi bears cookie gummi bears. Lollipop cupcake macaroon lollipop marzipan tiramisu chocolate bar soufflé. Jelly cake pastry oat cake apple pie dragée candy canes. Bonbon carrot cake jujubes candy carrot cake lemon drops cheesecake candy canes halvah. Sweet roll sesame snaps pudding I love. Donut powder I love dragée cheesecake pastry I love I love apple pie. Bear claw biscuit gummi bears. Toffee chocolate gummi bears. Oat cake sugar plum icing cookie. Candy jelly croissant oat cake cookie caramels gingerbread lemon drops. Apple pie biscuit chocolate. Sugar plum carrot cake I love bonbon candy I love gummi bears chocolate cake. Gummies brownie I love sweet roll.
                          </p>

                          <p>
                            Chocolate I love icing liquorice. Marshmallow I love marzipan cupcake muffin macaroon gummi bears sesame snaps gingerbread. I love I love soufflé chupa chups sweet roll sugar plum cake. I love apple pie chocolate cotton candy muffin. Marzipan soufflé I love biscuit brownie croissant I love cupcake caramels. I love cotton candy bear claw muffin sweet powder gingerbread. Macaroon bear claw I love halvah bear claw pie soufflé pastry sweet. Oat cake marshmallow jelly beans. Donut candy canes chocolate bar gingerbread macaroon lemon drops croissant sesame snaps. Soufflé topping bear claw croissant danish I love macaroon dragée donut. Cake croissant I love. Sugar plum I love toffee cheesecake marshmallow brownie tiramisu gummies.
                          </p>
                        </div>
                      )}
                    />
                    <Route render={() => <div>Switch Default...</div>} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            </Page>
          )}
        />
      </div>
    );
  }
}
