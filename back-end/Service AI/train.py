from PIL import Image
import numpy as np
import pandas as pd
import skimage.io
import skimage.transform
import matplotlib.pyplot as plt
import keras
import os
from keras import Model, Sequential
from keras.layers import Conv2D, MaxPooling2D, Dense, Flatten, BatchNormalization
from io import BytesIO
from sklearn.model_selection import train_test_split
# from keras import optimizers
import tensorflow as tf

folder_names = ["nhận diện bóng cười_resized", "nhận diện chất ma túy, cần sa_resized", "nhận diện đánh nhau_resized", "nhận diện súng đạn_resized"]
folder_array = [np.array([0,0,0,0,1]),np.array([0,0,0,1,0]),np.array([0,0,1,0,0]),np.array([0,1,0,0,0])]
num_classes = len(folder_names) + 1

for dir_name in folder_names:
    dir_exists = os.path.isdir(dir_name)
    if not dir_exists:
        print("{} not found, exiting application".format(dir_name))
        exit(1)

def convertImageToNumpyArray(dir_name):
    image_arr = []
    dirs = os.listdir(dir_name)
    for item in dirs: 
        if (item == ".DS_Store"): continue
        im = Image.open(dir_name+"/"+item)
        im.load()
        image_arr.append(np.asarray(im, dtype="int32"))
    return image_arr

training_images = []
for folder in folder_names:
    training_images.append(convertImageToNumpyArray(folder))

print(len(training_images))

num_examples = 0
for training_image in training_images:
    num_examples += len(training_image)

print(num_examples)

X = np.zeros((num_examples, 224, 224, 3))
Y = np.zeros((num_examples, num_classes))

index = 0
for folder in range(len(folder_names)):
    for image in range(len(training_images[folder])):
        X[index, :, :, :] = training_images[folder][image]
        Y[index, :] = folder_array[folder]
        index += 1

X_tr, X_ts, Y_tr, Y_ts = train_test_split(
    X, Y, test_size=0.2, random_state=42, shuffle=True)

# X_tr = np.asarray(X_tr).astype('float32').reshape((-1,1))
# X_ts = np.asarray(X_ts).astype('float32').reshape((-1,1))

# Our vectorized labels
# Y_tr = np.asarray(Y_tr).astype('float32').reshape((-1,1))
# Y_ts = np.asarray(Y_ts).astype('float32').reshape((-1,1))

print(X_tr[0].shape)

keras.backend.clear_session()

input_shape = X_tr[0].shape

model = Sequential()

# this is VGG16.
model.add(Conv2D(64, (3,3), activation="relu", padding="same", kernel_initializer='he_uniform', name='block1_conv1', input_shape=input_shape))
model.add(Conv2D(64, (3,3), activation="relu", padding="same", kernel_initializer='he_uniform', name='block1_conv2'))
model.add(MaxPooling2D(pool_size=(2,2), strides=(2,2), name='block1_maxpool'))

model.add(Conv2D(128, (3,3), activation="relu", padding="same", kernel_initializer='he_uniform', name='block2_conv1'))
model.add(Conv2D(128, (3,3), activation="relu", padding="same", kernel_initializer='he_uniform', name='block2_conv2'))
model.add(MaxPooling2D(pool_size=(2,2), strides=(2,2), name='block2_maxpool'))

model.add(Conv2D(256, (3,3), activation="relu", padding="same", kernel_initializer='he_uniform', name='block3_conv1'))
model.add(Conv2D(256, (3,3), activation="relu", padding="same", kernel_initializer='he_uniform', name='block3_conv2'))
model.add(Conv2D(256, (3,3), activation="relu", padding="same", kernel_initializer='he_uniform', name='block3_conv3'))
model.add(MaxPooling2D(pool_size=(2,2), strides=(2,2), name='block3_maxpool'))

model.add(Conv2D(512, (3,3), activation="relu", padding="same", kernel_initializer='he_uniform', name='block4_conv1'))
model.add(Conv2D(512, (3,3), activation="relu", padding="same", kernel_initializer='he_uniform', name='block4_conv2'))
model.add(Conv2D(512, (3,3), activation="relu", padding="same", kernel_initializer='he_uniform', name='block4_conv3'))
model.add(MaxPooling2D(pool_size=(2,2), strides=(2,2), name='block4_maxpool'))

model.add(Conv2D(512, (3,3), activation="relu", padding="same", kernel_initializer='he_uniform', name='block5_conv1'))
model.add(Conv2D(512, (3,3), activation="relu", padding="same", kernel_initializer='he_uniform', name='block5_conv2'))
model.add(Conv2D(512, (3,3), activation="relu", padding="same", kernel_initializer='he_uniform', name='block5_conv3'))
model.add(MaxPooling2D(pool_size=(2,2), strides=(2,2), name='block5_maxpool'))

model.add(Flatten())
model.add(Dense(4096, activation='relu'))
model.add(Dense(4096, activation='relu'))
model.add(Dense(num_classes, activation='sigmoid'))

class LossHistory(keras.callbacks.Callback):
    def on_train_begin(self, logs={}):
        self.loss = []
        self.val_acc = []
        self.acc = []
        
    def on_batch_end(self, batch, logs={}):
        self.loss.append(logs.get('loss'))
        
    def on_epoch_end(self, epoch, logs):
        self.val_acc.append(logs.get('val_acc'))
        self.acc.append(logs.get('acc'))

history_cb = LossHistory()

def optimizer_init_fn(): 
    learning_rate = 1e-4
    return tf.keras.optimizers.Adam(learning_rate)

# model.compile(optimizer=optimizer_init_fn(), loss='sparse_categorical_crossentropy', metrics=['accuracy'])
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

model.fit(X_tr, Y_tr, epochs=2, batch_size=42, validation_data=(X_ts, Y_ts), callbacks=[history_cb])

model.save('hello.h5')

