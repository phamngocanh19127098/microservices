# HƯỚNG DẪN CHẠY DEMO MICROSERVICE TẠI MÔI TRƯỜNG DEVELOPER 

- Cài đặt Docker Hub.
- Cài đặt Kubernetes.
- Cài đặt NGINX Ingress Controller
- Cài đặt Skaffold.
<!-- - Cài đặt một số biến môi trường. -->


## Cài đặt Docker
 [Tìm hiểu cơ bản về docker tại đây.](https://topdev.vn/blog/docker-la-gi/)


![](https://github.com/Uhouse-product/Document/blob/master/Images/step-install-docker.PNG?raw=true)

| Hình 1. Các bước cài đặt Docker|

  ### 1. Đăng ký tài khoản Docker Hub [tại đây](https://hub.docker.com/signup) 
  
  
  ### 2. Tải và cài đặt Docker.

  #### 2.1 Đối với Mac OS và Window ta sẽ sử dụng Docker Deskop : có thể tải và sử dụng một trong hai link sau : [docker.com](https://www.docker.com/get-started) hoặc [docs.docker.com](https://docs.docker.com/get-docker/) 
  - Chú ý trong trường hợp gặp lỗi khi cài đặt với Window (hình 2) ta tiến hành cài đặt phần mềm theo đường link và chạy lệnh sau dưới quyền adminstrator trên Window PowerShell:
  

> Enable-WindowsOptionalFeature -Online -FeatureName $("VirtualMachinePlatform","Microsoft-Windows-Subsystem-Linux")

  |  ![](https://github.com/Uhouse-product/Document/blob/master/Images/docker-window-error.png?raw=true) 
|:--:| 
| Hình 2. Lỗi khi cài Docker deskop trên window|

  #### 2.2 Linux distributions. 
  
  - Ubuntu: https://docs.docker.com/install/linux/docker-ce/ubuntu/

  - Fedora: https://docs.docker.com/install/linux/docker-ce/fedora/

 - CentOS: https://docs.docker.com/install/linux/docker-ce/centos/

 - Debian: https://docs.docker.com/install/linux/docker-ce/debian/


 ### 3. Đăng nhập vào Docker.
Sau khi tạo tài khoản và cài đặt Docker ta tiên hành đăng nhập vào Docker:
``` 
  docker login
  Username :
  Password :
``` 

### 4. Xác nhận quá trình cài đặt :

``` 
  docker version
  Client :
    Version : ...
  Server :
    Engine :....
``` 

## Cài đặt Kubernetes.

  |  ![](https://github.com/Uhouse-product/Document/blob/master/Images/k8s-setup.PNG?raw=true) 
|:--:| 
| Hình 3. Cài đặt Kubernetes|


  |  ![](https://github.com/Uhouse-product/Document/blob/master/Images/k8s-deskop.PNG?raw=true) 
|:--:| 
| Hình 4. Cài đặt Kubernetes trên Mac OS và Window|

 Đối với Linux distributions có thể cài đặt theo hướng dẫn tại [đây](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/) 

## Cài đặt NGINX Ingress Controller
Cài đặt NGINX Ingress theo hướng dẫn tại đây : [NGINX Ingress Controller](https://kubernetes.github.io/ingress-nginx/deploy/#quick-start)

- Đối với Mac OS hay Window có thể cài đặt thông qua lệnh sau:
> kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.0/deploy/static/provider/cloud/deploy.yaml


## Cài đặt Skaffold
Cài đặt Skaffold theo hướng dẫn tại đây : [Skaffold](https://skaffold.dev/docs/install/)


<!-- ## Cài đặt một số biến môi trường
- Cài đặt JWT token:
> kubectl  create secret generic jwt-secret --from-literal=JWT_KEY=lequangthach

- Cài đặt Stripe Key (dành cho dịch vụ thanh toán):
> kubectl create secret generic stripe-secret --from-literal STRIPE_KEY=sk_test_51KAfvlLSJvYMvd4ZEOSPJ6mKBhnUxgHoYKfPTX0I8G2HGy5DXFE7QHJOGHO9IkRUkUyqgZlBG8kd9ujduw6RpeSq00DkKLYbKC
<br>
<br> -->

# Chạy trên môi trường DEVELOPER
Sau khi lấy source từ github ta thực hiện chạy thông qua lệnh:
>  skaffold dev 



