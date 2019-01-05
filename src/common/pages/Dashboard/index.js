import loadable from 'loadable-components';
import Loading from '../../components/Loading';

export default loadable(() => import('./Dashboard'), {
  LoadingComponent: Loading
});
