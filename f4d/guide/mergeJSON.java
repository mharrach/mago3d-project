import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.FileNotFoundException;

import org.json.simple.JSONObject;
import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class mergeJSON {
	public static void main(String[] args) throws IOException {

		JSONArray jsonFile = new JSONArray();
		JSONParser jsonParser = new JSONParser();

		File f = new File("."); // Current directory
		File[] files = f.listFiles();

		for (File file : files) {
			if (file.isDirectory()) {
				String path = file.getAbsolutePath() + "/lonsLats.json";
				try {
					// Parsing the contents of the JSON file
					JSONObject jsonObject = (JSONObject) jsonParser.parse(new FileReader(path));
					// adding the parsed elements to a new json file
					jsonFile.add(jsonObject);  
				} catch (FileNotFoundException e) {
					e.printStackTrace();
				} catch (IOException e) {
					e.printStackTrace();
				} catch (ParseException e) {
					e.printStackTrace();
				}
			}
		}
		try {
			FileWriter fw = new FileWriter("mergedLonsLats.json");
			fw.write(jsonFile.toJSONString());
			fw.close();
		} catch (IOException e) {
			e.printStackTrace();
		}

	}
}