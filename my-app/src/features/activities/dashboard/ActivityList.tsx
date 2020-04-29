import React, { useContext } from 'react'
import { Item, Image, Button, ItemExtra, ItemHeader, Segment, Label } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import {observer} from 'mobx-react-lite'
import ActivityStore from '../../../app/stores/activityStore'
interface IProps{

    deleteActivity : (id:string) => void;
         submitting : boolean
  }
export const ActivityList : React.FC<IProps> = ({submitting,deleteActivity}) => {
  const activityStore = useContext(ActivityStore);  
  const {activities,selectActivity} = activityStore;
  return (
        <Segment clearing>
             <Item.Group divided>
                 {activities.map(activity=>(
                    <Item key = {activity.id}>
          <Item.Content>
            <Item.Header as='a'>{activity.title}</Item.Header>
            <Item.Meta>{activity.date}</Item.Meta>
            <Item.Description>
             <div>Une VH cuite au charbon avec un bon pain au feu de boit</div>
             <div>City , Venue</div>
            </Item.Description>
            <ItemExtra>
             <Button onClick={() => selectActivity(activity.id)}  floated ='right' content = 'View' color = 'blue'/>
           <Button loading = {submitting}
           onClick={()=>deleteActivity(activity.id)}
           floated='right'
           content='Delete'
           color='red'
           ></Button>
             <Label basic content ='Category'/>
            </ItemExtra>
          </Item.Content>
        </Item>
                 ))}
        
     
    
       
      </Item.Group>
        </Segment>
       
    )
}

export default observer(ActivityList);
