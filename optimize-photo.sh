#!/bin/bash

# Script para otimizar a foto de perfil
# Use este script após salvar sua foto como 'profile-original.jpg'

echo "🖼️  Otimizando foto de perfil..."

# Verifica se a foto original existe
if [ ! -f "assets/images/profile-original.jpg" ]; then
    echo "❌ Foto não encontrada em assets/images/profile-original.jpg"
    echo "📝 Instruções:"
    echo "   1. Salve sua foto como 'profile-original.jpg' na pasta assets/images/"
    echo "   2. Execute este script novamente"
    exit 1
fi

# Cria versões otimizadas da foto
echo "📐 Criando versão otimizada (400x400)..."

# Se tiver ImageMagick instalado (para redimensionar)
if command -v convert &> /dev/null; then
    convert assets/images/profile-original.jpg \
        -resize 400x400^ \
        -gravity center \
        -extent 400x400 \
        -quality 85 \
        assets/images/profile.jpg
    
    echo "✅ Foto otimizada criada: assets/images/profile.jpg"
else
    echo "⚠️  ImageMagick não encontrado"
    echo "📋 Instruções manuais:"
    echo "   1. Redimensione sua foto para 400x400 pixels"
    echo "   2. Salve como 'profile.jpg' na pasta assets/images/"
    echo "   3. Mantenha qualidade alta (85-90%)"
fi

echo "🎉 Processo concluído!"
echo "🔄 Recarregue o navegador para ver a nova foto"