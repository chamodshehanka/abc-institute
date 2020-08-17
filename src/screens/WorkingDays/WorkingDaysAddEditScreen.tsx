import React, { useState } from 'react';
import { TextField, Grid, Button } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

export interface WorkingDaysAddEditScreenProps {}

const WorkingDaysAddEditScreen: React.SFC<WorkingDaysAddEditScreenProps> = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [noOfWorkingDays, setNoOfWorkingDays] = useState(0);

  return (
    <>
      <h4 className='title'>{isEdit ? 'Update' : 'Create'} Working Days</h4>

      <div className='container mt-3'>
        <form>
          <Grid container spacing={2} className='form-row'>
            <Grid item xs={7}>
              <div>
                <label htmlFor='txtName' className='form-label'>
                  Name
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='txtName'
                  aria-describedby='emailHelp'
                  name='name'
                />
              </div>
            </Grid>
            <Grid item xs={5}>
              <div>
                <label htmlFor='txtNoPerWeek' className='form-label'>
                  No of Working Days per week
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='txtNoPerWeek'
                  aria-describedby='help'
                  disabled={true}
                  value={noOfWorkingDays}
                />
                <div id='help' className='form-text'>
                  Select your available days below to update this.
                </div>
              </div>
            </Grid>

            <Grid item xs={12}>
              <label htmlFor=''>Select Days</label>
              <br />
              <div className='form-check form-check-inline'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  value=''
                  id='cbMonday'
                />
                <label className='form-check-label' htmlFor='cbMonday'>
                  Monday
                </label>
              </div>

              <div className='form-check form-check-inline'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  value=''
                  id='cbTuesday'
                />
                <label className='form-check-label' htmlFor='cbTuesday'>
                  Tuesday
                </label>
              </div>

              <div className='form-check form-check-inline'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  value=''
                  id='cbWednesday'
                />
                <label className='form-check-label' htmlFor='cbWednesday'>
                  Wednesday
                </label>
              </div>

              <div className='form-check form-check-inline'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  value=''
                  id='cbThursday'
                />
                <label className='form-check-label' htmlFor='cbThursday'>
                  Thursday
                </label>
              </div>

              <br />
              <div className='mt-2'></div>

              <div className='form-check form-check-inline'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  value=''
                  id='cbFriday'
                />
                <label className='form-check-label' htmlFor='cbFriday'>
                  Friday
                </label>
              </div>

              <div className='form-check form-check-inline'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  value=''
                  id='cbSaturday'
                />
                <label className='form-check-label' htmlFor='cbSaturday'>
                  Saturday
                </label>
              </div>

              <div className='form-check form-check-inline'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  value=''
                  id='cbSunday'
                />
                <label className='form-check-label' htmlFor='cbSunday'>
                  Sunday
                </label>
              </div>
            </Grid>

            <div className='container mt-3'>
              <label htmlFor=''>Working Hours per Day</label>
            </div>
            <Grid item xs={3}>
              <div>
                <label htmlFor='txtName' className='form-label'>
                  Hours
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='txtName'
                  name='name'
                />
              </div>
            </Grid>

            <Grid item xs={3}>
              <div>
                <label htmlFor='txtName' className='form-label'>
                  Mins
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='txtName'
                  name='name'
                />
              </div>
            </Grid>

            <Grid item xs={6}>
              <Alert severity='info'>
                <AlertTitle>Info</AlertTitle>
                Include lunch time also — <strong>view more!</strong>
              </Alert>
            </Grid>

            <Grid item xs={12}>
              <label htmlFor=''>Preffered time slots</label>
              <br />
              <div className='form-check form-check-inline'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  value=''
                  id='cbThirtyMin'
                />
                <label className='form-check-label' htmlFor='cbThirtyMin'>
                  30 Min
                </label>
              </div>

              <div className='form-check form-check-inline'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  value=''
                  id='cbSixtyMin'
                />
                <label className='form-check-label' htmlFor='cbSixtyMin'>
                  60 Min
                </label>
              </div>
            </Grid>

            <Grid item xs={9}></Grid>
            <Grid item xs={3}>
              <div className='align-right' style={{ alignContent: 'right' }}>
                <button type='button' className='btn btn-primary btn-abc'>
                  Save
                </button>{' '}
                <button type='button' className='btn btn-danger btn-abc'>
                  Cancel
                </button>
              </div>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
};

export default WorkingDaysAddEditScreen;