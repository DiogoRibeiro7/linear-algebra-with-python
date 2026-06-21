# Reflexão A06

Neste assignment percebi que classificar a posição relativa de retas e planos é basicamente resolver sistemas lineares de outra forma. Quando duas retas são paralelas, os vetores direção são proporcionais — o produto vetorial dá zero. Quando são reversas, não se intersectam mas também não são paralelas, o que em 2D não existe mas em 3D acontece o tempo todo.

A parte que achei mais interessante foi a conversão do plano cartesiano para paramétrico. Basicamente o vetor normal do plano é os coeficientes a, b, c da equação ax+by+cz=d, e a partir daí consigo construir dois vetores de direção perpendiculares ao normal usando o produto vetorial.

Na interseção reta-plano substituímos a equação paramétrica da reta na equação do plano e resolvemos para t — se o denominador for zero a reta é paralela ao plano. É literalmente o Teorema de Rouché-Capelli a trabalhar: o sistema ou tem solução única (t determinado), ou não tem solução (paralela), ou tem infinitas (reta contida).

O produto interno serve para testar perpendicularidade (dot = 0) e o produto vetorial para paralelismo (cross = 0). Simples mas poderoso.
