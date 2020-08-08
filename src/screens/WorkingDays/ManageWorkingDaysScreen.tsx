import React, { useState } from 'react';
import { Container, Card, Toolbar, Grid } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { WorkingDays } from '../../models/WorkingDays';
import { useGetWorkingDays } from '../../queries/useGetWorkingDays';

export interface ManageWorkingDaysScreenProps {}

const ManageWorkingDaysScreen: React.SFC<ManageWorkingDaysScreenProps> = () => {
  const [searchText, setSearchText] = useState('');
  const array = useGetWorkingDays();
  console.log("Array check",array.data);

  const [tempData] = useState([
    {
      id: 1,
      name: 'working-days-1',
      noOfWorkingDays: 3,
      noOfWorkingHours: 5,
    },
    {
      id: 2,
      name: 'working-days-2',
      noOfWorkingDays: 3,
      noOfWorkingHours: 5,
    },
  ]);

  return (
    <>
      <h4 className='title'>Manage Working Days</h4>

      <div className='row mb-3'>
        <div className='col-1'></div>
        <div className='col-8'>
          <input
            type='text'
            className='form-control'
            placeholder='Search To Filter'
          />
        </div>
        <div className='col-3'>
          <button className='btn btn-primary'>Create</button>
        </div>
      </div>

      <div className='row mb-3'>
        <div className='col-9'></div>
        <div className='col-2'>
          <select className='form-select' aria-label='Default select example'>
            <option selected>Sort By</option>
            <option value='1'>One</option>
            <option value='2'>Two</option>
            <option value='3'>Three</option>
          </select>
        </div>
      </div>

      <Container className='top-container'>
        <Card>
          <Toolbar style={{ paddingLeft: 0 }}>
            <div className='container'>
              <table className='table table-light table-striped table-hover'>
                <thead>
                  <th>ID</th>
                  <th>Name</th>
                  <th>No of working Days</th>
                  <th>No of working Hours</th>
                  <th></th>
                </thead>
                <tbody>
                  {tempData.map((item: any) => (
                    <tr key={item?.id}>
                      <td>{item?.id}</td>
                      <td>{item?.name}</td>
                      <td>{item?.noOfWorkingDays}</td>
                      <td>{item?.noOfWorkingHours}</td>
                      <td>
                        <MenuIcon />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Toolbar>
        </Card>
      </Container>
    </>
  );
};

export default ManageWorkingDaysScreen;
