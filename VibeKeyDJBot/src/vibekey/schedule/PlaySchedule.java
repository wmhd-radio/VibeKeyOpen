package vibekey.schedule;
import java.util.ArrayList;
import java.util.Date;

import vibekey.firebase.FirebaseCommunicator;

public class PlaySchedule {
	public ArrayList<ScheduleItem> scheduleItems = new ArrayList<ScheduleItem>();
	
	public PlaySchedule(){
		FirebaseCommunicator.loadSchedule(scheduleItems);
	}
	
	
	
	public void addToSchedule(ScheduleItem newScheduleItem){
		for(ScheduleItem scheduleItem : scheduleItems){
			if(((newScheduleItem.getStartTime().after(scheduleItem.getStartTime()) &&
					newScheduleItem.getStartTime().before(scheduleItem.getEndTime())) ||
					(newScheduleItem.getEndTime().after(scheduleItem.getStartTime()) &&
					newScheduleItem.getEndTime().before(scheduleItem.getEndTime())))){ //if times are overlapping
				break;
			}
		}
		scheduleItems.add(newScheduleItem);
		this.pushToFirebase();
	}
	
	// public void addToSchedule_return(ScheduleItem newScheduleItem){
	// 	for(ScheduleItem scheduleItem : scheduleItems){
	// 		if(((newScheduleItem.getStartTime().after(scheduleItem.getStartTime()) &&
	// 				newScheduleItem.getStartTime().before(scheduleItem.getEndTime())) ||
	// 				(newScheduleItem.getEndTime().after(scheduleItem.getStartTime()) &&
	// 				newScheduleItem.getEndTime().before(scheduleItem.getEndTime())))){ //if times are overlapping
	// 			break;
	// 		}
	// 	}
	// 	scheduleItems.add(newScheduleItem);
	// 	return(newScheduleItem);
	// }
	

	public ScheduleItem getCurScheduleItem(){
		Date curTime = new Date();
		for(ScheduleItem scheduleItem : scheduleItems){
			if(scheduleItem.getStartTime().before(curTime) && scheduleItem.getEndTime().after(curTime)){ //if this schedule item is happening now
				return scheduleItem;
			}
		}
		return null;
	}
	
	public int getCurPlayMode(){
		ScheduleItem curScheduleItem = getCurScheduleItem();
		if(curScheduleItem == null){
			return 0;
		}else{
			return curScheduleItem.getPlayMode();
		}
	}
	
	public String getCurGenre(){
		ScheduleItem curScheduleItem = getCurScheduleItem();
		if(curScheduleItem == null){
			return "";
		}else{
			return curScheduleItem.getGenre();
		}
	}
	
	public String getCurPlaylist(){
		ScheduleItem curScheduleItem = getCurScheduleItem();
		if(curScheduleItem == null){
			return "";
		}else{
			return curScheduleItem.getPlaylist();
		}
	}
	

	public ScheduleItem getScheduleItemAtTime(Date time){
		for(ScheduleItem scheduleItem : scheduleItems){
			if(scheduleItem.getStartTime().before(time) && scheduleItem.getEndTime().after(time)){ //if this schedule item is happening now
				return scheduleItem;
			}
		}
		return null;
	}
	
	public int getPlayModeAtTime(Date time){
		ScheduleItem scheduleItem = getScheduleItemAtTime(time);
		if(scheduleItem == null){
			return 0;
		}else{
			return scheduleItem.getPlayMode();
		}
	}
	
	public String getGenreAtTime(Date time){
		ScheduleItem scheduleItem = getScheduleItemAtTime(time);
		if(scheduleItem == null){
			return "";
		}else{
			return scheduleItem.getGenre();
		}
	}
	
	public String getPlaylistAtTime(Date time){
		ScheduleItem scheduleItem = getScheduleItemAtTime(time);
		if(scheduleItem == null){
			return "";
		}else{
			return scheduleItem.getPlaylist();
		}
	}
	
	public void pushToFirebase(){
		FirebaseCommunicator.syncScheduleWithFirebase(this);
	}
}