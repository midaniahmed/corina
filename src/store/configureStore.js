import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import monitorReducersEnhancer from './enhancer';
// import loggerMiddleware from './logger';
import reducers from '../reducers/reducers';

export default function configureStore(preloadedState) {
  // const middlewares = [loggerMiddleware, thunkMiddleware];

  const middlewareEnhancer = applyMiddleware(thunkMiddleware);

  const enhancers = [middlewareEnhancer, monitorReducersEnhancer];

  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(
    reducers,
    preloadedState,
    composedEnhancers
  );

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(reducers)
    );
  }

  return store;
}
