from django.db import models

# Create your models here.
class Users(models.Model):
    name = models.TextField()
    age = models.TextField()
    Dep = models.TextField()    
  
    class Meta:
        db_table='Users'
  
    #def publish(self):
    #    self.save()
