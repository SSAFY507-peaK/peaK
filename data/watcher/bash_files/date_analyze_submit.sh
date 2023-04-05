spark-submit \
   --master local[4] \
   --deploy-mode client\
   --driver-memory 8g \
   --executor-memory 8g \
   --executor-cores 4  \
	 --verbose \
   data_analyze.py 
