package core_objects_abstract;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * A core object for songs.
 * 
 * @author Rose Reatherford
 * @date Created: 12/17/2014
 */
public class Song implements Comparable<Song> {
	// Constants //
	/** Constant for a file path. */
	public static String FILEPATH = "filepath";
	/** Constant for a song id. */
	public static String ID = "id";
	/** Constant for a song id. */
	public static String GENRE = "genre";
	/** Constant for a song id. */
	public static String ARTIST = "artist";
	/** Constant for a song id. */
	public static String ALBUM = "album";
	/** The size to buffer the song. */
	public static int BUFFER_SIZE = 1024;
	
	// Local Information //
	/** Stores other song information locally. */
	private HashMap<String, String> information;
	/** Size of the song, in bytes. */
	private long size;
	/** The length of the song, in second. */
	private int length;
	/** The song buffer. */
	private List<byte[]> buffer;
	private int rank;
	private long time;
	
	/**
	 * A constructor that creates a basic song.
	 * @param filepath The file path of the song.
	 * @param length The length of the song in total seconds.
	 * @param id The id of the song.
	 */
	public Song (String filepath, int length, String id, int size) {
		this.information = new HashMap<String, String>();
		this.information.put(FILEPATH, filepath);
		this.information.put(ID, id);
		this.length = length;
		this.size = size;
		this.buffer = new CopyOnWriteArrayList<byte[]>();
		this.time = 0;
		this.rank = 10;
	}
	
	/**
	 * Returns the pointer to the buffer.
	 * @return A list of all currently buffered parts of the song, 
	 * 			broken into BUFFER_SIZE arrays
	 */
	public List<byte[]> getBuffer() {
		return buffer;
	}
	
	/**
	 * Returns true if the thread is finished buffering, else false.
	 * @return
	 */
	public boolean finishedBuffering() {
		return buffer.size() >= Math.ceil(size / BUFFER_SIZE);
	}
	
	/**
	 * Buffers the BUFFER_SIZE of one part of the song.
	 */
	public void buffer() {
		byte[] buff = new byte[BUFFER_SIZE];

		FileInputStream in = null;
		
        try {
            File file = new File(this.information.get(FILEPATH));
            in = new FileInputStream(file);
            
			in.read(buff);
			
			buffer.add(buff);

			synchronized (this) {
				this.notifyAll();
			}
			
        } catch (Exception e) {
            e.printStackTrace();
        } finally{
        	if(in != null){
        		try {
					in.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
        	}
        }
	}
	
	/**
	 * Gets the database id of this song.
	 * @return The id.
	 */
	public String getId() {
		return information.get(ID);
	}
	
	/**
	 * Gets the file path for this song.
	 * @return The file path.
	 */
	public String getFilePath() {
		return information.get(FILEPATH);
	}
	
	/**
	 * Returns the length of this song.
	 * @return Returns the total seconds of this song.
	 */
	public int getLength() {
		return length;
	}
	
	/**
	 * Gets the file path of a song.
	 * @param parameter The parameter to get, should be a constant.
	 * @return The file path of a song, returns null if the parameter
	 * 				does not exist.
	 */
	public String getParameter(String parameter) {
		return information.get(parameter);
	}
	
	/**
	 * Adds a new parameter.
	 * @param parameter The name of the parameter, should be a constant.
	 * @param value The value for this parameter, for this song.
	 */
	public void addParameter(String parameter, String value) {
		information.put(parameter, value);
	}
	
	public void changeRank(int newRank) {
		this.rank = newRank;
	}
	
	/**
	 * Computes the priority of the song proportional to the rank and 
	 * 	amount already buffer minus the time it has been in the queue.
	 * @return The priority of this song.
	 */
	private long computePriority() {
		return rank * ((BUFFER_SIZE * buffer.size()) - (System.currentTimeMillis() - time));
	}

	@Override
	public int compareTo(Song song) {
		return (int) (computePriority() - song.computePriority());
	}
}
