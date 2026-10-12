import os
import cv2
import numpy as np

def create_combined_wind_and_screen(image_path, screen_video_path, output_path="final_combined_output.mp4"):
    # 1. Validate source files
    if not os.path.exists(image_path):
        print(f"Error: Missing static image '{image_path}'")
        return
    if not os.path.exists(screen_video_path):
        print(f"Error: Missing your screen video '{screen_video_path}'")
        return
        
    # Load base image and screen video capture
    base_img = cv2.imread(image_path)
    h, w, _ = base_img.shape
    
    cap_screen = cv2.VideoCapture(screen_video_path)
    fps = cap_screen.get(cv2.CAP_PROP_FPS)
    total_frames = int(cap_screen.get(cv2.CAP_PROP_FRAME_COUNT))
    
    if fps == 0 or total_frames == 0:
        fps = 30.0
        total_frames = 120  # Fallback defaults
        
    # Setup video output writer
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(output_path, fourcc, fps, (w, h))
    
    print(f"Processing {total_frames} frames. Animating plants + embedding screen video...")
    
    grid_x, grid_y = np.meshgrid(np.arange(w), np.arange(h))
    
    # 2. STRICT PLANTS-ONLY MASK (Lady's shirt area is completely 0.0 / Untouched)
    plant_mask = np.zeros((h, w), dtype=np.float32)
    # Left Plant Leaves Only
    cv2.rectangle(plant_mask, (0, int(h*0.1)), (int(w*0.22), int(h*0.65)), 1.0, -1)
    # Right Plant Leaves Only
    cv2.rectangle(plant_mask, (int(w*0.78), int(h*0.1)), (w, int(h*0.65)), 1.0, -1)
    # Soften edges slightly so the plant leaves blend cleanly
    plant_mask = cv2.GaussianBlur(plant_mask, (31, 31), 0)

    # 3. Timeline Frame Stitching Loop
    for frame in range(total_frames):
        # Read the next frame from your existing screen video
        ret, screen_frame = cap_screen.read()
        
        # If your screen video runs out of frames, loop it or use the last valid frame
        if not ret:
            cap_screen.set(cv2.CAP_PROP_POS_FRAMES, 0)
            ret, screen_frame = cap_screen.read()
            if not ret:
                screen_frame = base_img.copy() # Ultimate fallback
                
        # Resize screen video frame to match background just in case they differ
        if screen_frame.shape[:2] != (h, w):
            screen_frame = cv2.resize(screen_frame, (w, h))
            
        # 4. Generate Wind Flutter on the Plant Layers ONLY
        angle = (frame / total_frames) * 2 * np.pi
        flutter_x = (np.sin(grid_y / 12.0 + angle * 2.5) * 6.0) + 3.0 * np.sin(angle)
        flutter_y = np.cos(grid_x / 20.0 + angle * 3.0) * 2.0
        
        map_x = grid_x + (flutter_x * plant_mask)
        map_y = grid_y + (flutter_y * plant_mask)
        
        # Render the animated background (only plants move, lady is 100% frozen)
        animated_bg = cv2.remap(base_img, map_x.astype(np.float32), map_y.astype(np.float32), 
                                interpolation=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)
        
        # 5. AUTO-DETECT THE ANIMATED SCREEN PORTION
        # Compares your screen video frame against the static image to find where pixels are changing
        frame_diff = cv2.absdiff(screen_frame, base_img)
        gray_diff = cv2.cvtColor(frame_diff, cv2.COLOR_BGR2GRAY)
        _, change_mask = cv2.threshold(gray_diff, 8, 255, cv2.THRESH_BINARY)
        
        # Clean up the change mask (fill small gaps inside the screen)
        kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (15, 15))
        change_mask = cv2.morphologyEx(change_mask, cv2.MORPH_CLOSE, kernel)
        change_mask_3d = cv2.merge([change_mask, change_mask, change_mask]) / 255.0
        
        # 6. COMPOSITE EVERYTHING TOGETHER
        # Wherever pixels are changing in your video -> Use the screen video
        # Everywhere else -> Use our animated plants background
        final_frame = (screen_frame * change_mask_3d) + (animated_bg * (1.0 - change_mask_3d))
        final_frame = np.clip(final_frame, 0, 255).astype(np.uint8)
        
        out.write(final_frame)
        
    cap_screen.release()
    out.release()
    print(f"\nFinished! Your perfect master video is saved as: '{output_path}'")

if __name__ == "__main__":
    # Make sure 'screen_animated.mp4' matches your existing file name exactly!
    create_combined_wind_and_screen("banner.png", "banner-animation.mp4")
