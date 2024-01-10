import { render } from '@testing-library/react';

import App from './app';
import { RootStore } from './state/root-store';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App rootStore={new RootStore()} />);
    expect(baseElement).toBeTruthy();
  });

  /* it('should have a greeting as the title', () => {
    const { getByText } = render(<App rootStore={new RootStore()} />);
    expect(getByText(/Welcome js-exam/gi)).toBeTruthy();
  });*/
});
