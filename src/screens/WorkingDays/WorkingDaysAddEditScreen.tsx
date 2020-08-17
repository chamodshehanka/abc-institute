import React, { useState } from 'react';

export interface WorkingDaysAddEditScreenProps {}

const WorkingDaysAddEditScreen: React.SFC<WorkingDaysAddEditScreenProps> = () => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <>
      <h4 className='title'>{isEdit ? 'Update' : 'Create'} Working Days</h4>
    </>
  );
};

export default WorkingDaysAddEditScreen;
