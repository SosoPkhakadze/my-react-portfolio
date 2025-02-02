import os

def get_files_and_codes_to_txt(folder_path, output_file="file_contents.txt"):
    """
    Recursively explores a folder, extracts file names and code, and writes the 
    information to a text file.

    Args:
        folder_path: The path to the folder to explore.
        output_file: The name of the text file to create (default: "file_contents.txt").
    """

    with open(output_file, 'w', encoding='utf-8') as outfile:
        for root, _, files in os.walk(folder_path):
            for file in files:
                file_path = os.path.join(root, file)

                outfile.write(f"File Path: {file_path}\n")
                outfile.write(f"File Name: {file}\n")

                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        code = f.read()
                        outfile.write("Code:\n")
                        outfile.write(code + "\n")
                except UnicodeDecodeError:
                    outfile.write("Skipping binary or non-UTF-8 file.\n")
                except Exception as e:
                    outfile.write(f"Error reading file {file_path}: {e}\n")

                outfile.write("-" * 20 + "\n")

# Example usage:
folder_path = r"C:\Users\admin\Desktop\portfolio\my-react-portfolio\src"  # Replace with the actual folder path
output_file = "my_files_and_code.txt"  # Optional: specify a different output file name
get_files_and_codes_to_txt(folder_path, output_file)

print(f"File information written to {output_file}")