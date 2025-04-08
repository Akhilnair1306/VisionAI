import json


with open('countries+states+cities.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# Step 2: Filter out India from the dataset
india_data = [country for country in data if country['name'] == "India"]

# Step 3: Save the filtered India data to a new JSON file
with open('india_data.json', 'w', encoding='utf-8') as output_file:
    json.dump(india_data, output_file, indent=4)

# Optionally, print to verify
print(f"Filtered India data saved to 'india_data.json'.")
