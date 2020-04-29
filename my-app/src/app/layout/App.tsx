import React,{useState,useEffect,Fragment,useContext} from 'react';
import { Container} from 'semantic-ui-react';
import {IActivity} from '../models/activity';
import axios from 'axios';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent'
import {LoadingComponent} from './LoadingComponent';
import ActivityStore from '../stores/activityStore'
import {observer} from 'mobx-react-lite'


const App = () => {
const activityStore = useContext(ActivityStore);
const [activities, setActivities]= useState<IActivity[]>([]);
const [selectedActivity,setSelectedActivity] = useState<IActivity | null>(null);
const [editMode, setEditMode] = useState(false);
const [loading,setLoading] = useState(true);
const [submitting,setSubmitting] = useState(false);
const handleOpenCreateForm = () => {
  setSelectedActivity(null);
  setEditMode(true);

}
const handleDeleteActivity=(id : string)=>{
  setSubmitting(true);
  agent.Activities.delete(id).then(()=>{
    setActivities([...activities.filter(a=>a.id!==id)])
  }).then(()=>setSubmitting(false))
}
const handleCreateActivity = (activity : IActivity) =>{
  setSubmitting(true);
  agent.Activities.create(activity).then(() => {
    setActivities([...activities,activity]);
      setSelectedActivity(activity);
      setEditMode(false);
     
    }).then(()=>setSubmitting(false))
}

const hanleEditActivity = (activity : IActivity)=>{
  setSubmitting(true);
  agent.Activities.update(activity).then(()=>{
  setActivities([...activities.filter(a=>a.id != activity.id),activity])
  setSelectedActivity(activity)
  setEditMode(false)
  
}).then(()=>setSubmitting(false))
}

const handleSelectedActivity= (id : string)=>{
  setSelectedActivity(activities.filter(a => a.id == id)[0])
} 

useEffect (()=>{
  activityStore.loadActivities();
},[activityStore]);

if(activityStore.loadingInitial) return <LoadingComponent content = 'Loading activities...'/>
  return (
    <Fragment>
    <NavBar/>

<Container style = {{marginTop : '7em'}}>
 
<ActivityDashboard activities = {activityStore.activities} selectActivity={handleSelectedActivity} deleteActivity={handleDeleteActivity}
 setEditMode = {setEditMode}
setSelectedActivity={setSelectedActivity} createActivity = {handleCreateActivity} editActivity = {hanleEditActivity}
submitting = {submitting}
/>
</Container>
</Fragment>


  );

}
export default observer(App);
