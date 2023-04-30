import dynamic from 'next/dynamic';

const DynamicComponentWithNoSSR = dynamic(() => import('./components/PageDefault/PageDefault'), {
  ssr: false,
});
export default () => <DynamicComponentWithNoSSR />