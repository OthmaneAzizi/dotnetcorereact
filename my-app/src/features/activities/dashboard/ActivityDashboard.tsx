import React, { useContext } from 'react'
import { Grid, List } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity';
import { ActivityList } from './ActivityList';
import { ActivityDetails } from '../details/ActivityDetails';
import { ActivityForm } from '../folder/ActivityForm';
import {observer} from 'mobx-react-lite'
import ActivityStore from '../../../app/stores/activityStore'
interface IProps{
    activities : IActivity[];
    selectActivity : (id : string) =>void;
   
  
    setEditMode : (editMode : boolean) => void;
    setSelectedActivity : (activity : IActivity | null) => void;
    createActivity : (activity : IActivity) => void;
    editActivity : (activity : IActivity) => void;
    deleteActivity:(id : string)=>void;
    submitting : boolean
}


const ActivityDashboard: React.FC<IProps> = 
({activities,selectActivity,setEditMode,setSelectedActivity,createActivity,editActivity,submitting,deleteActivity}) =>{
   const activityStore = useContext(ActivityStore); 
   const {editMode,selectedActivity} = activityStore;
    return (
       <Grid>
           <Grid.Column width={8}> 
               <ActivityList submitting={submitting} deleteActivity={deleteActivity} />

           </Grid.Column>
           <Grid.Column width = {8}>
               {selectedActivity && !editMode && (
               <ActivityDetails 
             
               setEditMode = {setEditMode}
               setSelectedActivity = {setSelectedActivity}  /> )}
               {editMode && <ActivityForm submitting = {submitting} setEditMode = {setEditMode}  activity = {selectedActivity!} 
               createActivity = {createActivity} editActivity = {editActivity}/>}
           
           </Grid.Column>
       </Grid>
    );
};


export default observer(ActivityDashboard);
