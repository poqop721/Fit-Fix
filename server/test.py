import tensorflow as tf

from tensorflow import keras

 

model = keras.models.load_model('fit fix.h5')

 

model.summary()

import numpy as np

import os

import tensorflow as tf

# import tensorflow_datasets as tfds

import json

prediction=[]

file_path='/Users/kdcrafter10/Desktop/test/test'

 

img=tf.keras.utils.load_img(file_path+'.jpg',target_size=(224,224,3))

input_arr = tf.keras.preprocessing.image.img_to_array(img)

input_arr = np.array([input_arr])/255.0

predictions =model.predict(input_arr)

 

 

for i in predictions:

    if i[0][0]>=0.5:

        prediction.append(1)

    else:

        prediction.append(0)

 

print(prediction)