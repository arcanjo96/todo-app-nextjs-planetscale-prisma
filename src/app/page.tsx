
// const DynamicComponentWithNoSSR = dynamic(() => import('./components/PageDefault/PageDefault'), {
//   ssr: false,
// });
// export default () => <DynamicComponentWithNoSSR />

import Home from "./components/PageDefault/PageDefault";

export default () => <Home />
