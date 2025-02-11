import os
import json

# Initialize an empty dictionary to store file contents
file_contents = {}

# Loop through numbers 1 to 10 to read the respective files
for i in range(1, 11):
    file_name = f"{i}.txt"
    
    # Check if the file exists in the current directory
    if os.path.exists(file_name):
        with open(file_name, 'r') as file:
            # Read content and split by \n into a list of lines
            content = file.read().strip().split('\n')
            file_contents[i] = content  # Store the list of lines in the dictionary

# Write the dictionary to a JSON file with each line as a list item
with open('file_contents.json', 'w') as json_file:
    json.dump(file_contents, json_file, indent=4)

print("Data has been exported to 'file_contents.json'")
