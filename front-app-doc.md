# Documentation des commandes utilisées pour le projet front-app

## 1. Build de l'image Docker pour la production

```
docker build -t front-app:prd --build-arg BUILD_CONFIG=prd .
```

## 2. Lancer l'image Docker localement

```
docker run -p 8080:80 front-app:prd
```

## 3. Taguer et pousser l'image sur un registre (optionnel)

```
docker tag front-app:prd <registry>/front-app:prd
docker push <registry>/front-app:prd
```

## 4. Déploiement sur Kubernetes avec Minikube

### Appliquer le déploiement

```
kubectl apply -f src/acid/prd/deployment.yaml
```

### Appliquer le service

```
kubectl apply -f src/acid/prd/service.yaml
```

### Appliquer l'ingress

```
kubectl apply -f src/acid/prd/ingress.yaml
```

### Ouvrir le tunnel Minikube pour accéder à l'ingress

```
minikube tunnel
```

## 5. Vérifier les ressources déployées

```
kubectl get pods
kubectl get services
kubectl get ingress
```

**Remarques :**

### Lister les images présentes dans Minikube

```
minikube image ls
```

### Charger une image Docker locale dans Minikube

```
minikube image load front-app:prd
```
