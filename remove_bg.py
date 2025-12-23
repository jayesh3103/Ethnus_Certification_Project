from PIL import Image

def remove_white_background(input_path, output_path, threshold=240):
    img = Image.open(input_path)
    img = img.convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        # Check if R, G, B are all above threshold (near white)
        if item[0] > threshold and item[1] > threshold and item[2] > threshold:
            newData.append((255, 255, 255, 0)) # Make Transparent
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(output_path, "PNG")
    print(f"Saved transparent image to {output_path}")

if __name__ == "__main__":
    input_file = "/Users/jayeshmuley/Downloads/job-portal/client/src/assets/hiristiq_icon.png"
    output_file = "/Users/jayeshmuley/Downloads/job-portal/client/src/assets/hiristiq_icon_transparent.png"
    remove_white_background(input_file, output_file)
