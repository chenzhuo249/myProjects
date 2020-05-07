from django.db import models

# Create your models here.
class Index(models.Model):

    uname = models.CharField(verbose_name="姓名", max_length=10, default="")
    img = models.CharField(verbose_name="图片名称", max_length=50, default="")
