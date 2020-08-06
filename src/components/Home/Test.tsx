import * as React from 'react';

export interface TestProps {}

const Test: React.SFC<TestProps> = () => {
  return (
    <>
      <button type='button' className='btn btn-primary'>
        Primary
      </button>
    </>
  );
};

export default Test;
