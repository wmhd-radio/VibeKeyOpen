package vibekey.song;
import java.util.LinkedList;

import com.firebase.client.Firebase;

import vibekey.syncable.SyncableContainer;

public class SongQueue extends SyncableContainer {
	
	static final public int FILL_SIZE = 5;
	
	LinkedList<Song> queue = new LinkedList<Song>();
	
	public SongQueue(Firebase ref){
		super(ref.child("queue"));
	}
	
	public int getTotalTime(){
		int totalTime = 0;
		for(Song song : queue){
			totalTime+= song.getLength();
		}
		return totalTime;
	}
	
	public void addToQueue(Song song){
		queue.offer(song);
		this.setChanged(true);
	}
	
	public int size(){
		return queue.size();
	}
	
	public Song popFromQueue(){
		Song nextSong = queue.poll();
		this.setChanged(true);
		return nextSong;
	}
	
	public void emptyQueue(){
		queue.clear();
		this.setChanged(true);
	}
	
	public void removeFromQueueAt(int index){
		queue.remove(index);
		this.setChanged(true);
	}
	
	public void addToQueueAt(int index, Song song){
		queue.add(index, song);
		this.setChanged(true);
	}
}
