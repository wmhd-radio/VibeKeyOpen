package primary_manager;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.SynchronousQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

import mysql.SQLConnection;

import com.mysql.jdbc.Statement;

import djbot.DJBot;

public class VibeKey {
	public static PrimaryManager manager = new PrimaryManager();
	public static ExecutorService threadExecutor = Executors.newCachedThreadPool();

	public static void main(String[] args) throws SQLException, ClassNotFoundException {
		
		SQLConnection conn = new SQLConnection("wmhd-test.csse.rose-hulman.edu", "wmhd-test", "jungckjp", "");
		conn.execQuery("SELECT * FROM Calendar_Item");
		//conn.execStoredProc();
		
		/*
		CallableStatement cStmt = conn.prepareCall("{call Calendar_GET(?,?,?,?)}");
		cStmt.setInt(1,03);
		cStmt.setInt(2, 2015);
		cStmt.registerOutParameter(3, java.sql.Types.INTEGER);
		cStmt.registerOutParameter(4, java.sql.Types.VARCHAR);
		boolean results2 = cStmt.execute();
		ResultSet rs = null;
		while(results2){
			rs = cStmt.getResultSet();
			
			String name2 = cStmt.getString(4);
			int id = cStmt.getInt(3);
			System.out.println("called procedure name: " + name2 + " and the ID is: " + id);
			//results2 = cStmt.getMoreResults();
		}
		String name = cStmt.getString(1);
		System.out.println(name);*/
		
		DJBot bot = new DJBot();
		System.out.println(bot.getSong().getId());
		System.out.println(bot.getSong().getId());
		System.out.println(bot.getSong().getId());
		System.out.println(bot.getSong().getId());
	}

	public static ExecutorService getNewExecutor(int maxSize){
		return new ThreadPoolExecutor(0, maxSize,
                60L, TimeUnit.SECONDS,
			    new SynchronousQueue<Runnable>()); // queue with a size
	}
	
}
