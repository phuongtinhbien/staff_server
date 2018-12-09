import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import gql from 'graphql-tag';
import Unit from './Unit';
import Label from './Label';
import Color from './Color';
import Material from './Material';
import ColorGroup from './ColorGroup';
import TimeSchedule from './timeSchedule';
import { Query } from 'react-apollo';
import Error from '../../Error';
const OPTION_QUERY = gql `query allOptionList {
    allUnits{
      nodes{
        nodeId
        id
        unitName
        status
      }
    }
    allLabels{
      nodes{
        nodeId
        id
        labelName
        status
      }
    }
    allMaterials{
      nodes{
        nodeId
        id
        materialName
        status
      }
    }
    allColors{
      nodes{
        nodeId
        id
        colorName
        colorGroupByColorGroupId{
        colorGroupName
        id
      }
        status
      }
    }
    allColorGroups{
      nodes{
        nodeId
        id
        colorGroupName
        status
      }
    }
    
    allTimeSchedules{
      nodes{
        nodeId
        id
        timeScheduleNo
        timeStart
        timeEnd
        status
      }
    }
  }`;
const Other = () => (
    <div className="card">
    <div className="header">
                <h4>Các thuộc tính khác</h4>
                <p></p>
              </div>
  <div className="content">
    <div className="container-fluid">
    <Query
      query={OPTION_QUERY}
      fetchPolicy={"network-only"}
 
    >{({ loading, error, data, refetch, }) => {
      if (loading) return null;
      if (refetch) {
        console.log(refetch);
      }
      if (error){
        return (<Error errorContent= {error.message}></Error>);
      }
      if (data != null){
      return (
      
        <Tabs defaultActiveKey={1} id="plan-text-tabs">
        <Tab eventKey={1} title="Khung giờ"><TimeSchedule data={data.allTimeSchedules.nodes}/></Tab>
        <Tab eventKey={2} title="Đơn vị tính"> <Unit data={data.allUnits.nodes}></Unit></Tab>
        <Tab eventKey={3} title="Nhãn hiệu"><Label data={data.allLabels.nodes}></Label></Tab>
        <Tab eventKey={4} title="Nhóm màu"><ColorGroup data={data.allColorGroups.nodes}></ColorGroup></Tab>
        <Tab eventKey={5} title="Màu sắc"><Color colorGroup={data.allColorGroups.nodes} data={data.allColors.nodes}></Color></Tab>
        <Tab eventKey={6} title="Chất liệu"><Material data={data.allMaterials.nodes}></Material></Tab>
    </Tabs>

        
      );
      }
    }}
    </Query>
    
    </div>
  </div>
  </div>
);

export default Other;