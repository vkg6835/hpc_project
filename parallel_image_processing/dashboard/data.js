const dashboardData = {
    "cpuCores": 8,
    "metrics": [
        {
            "filter": "Gaussian Blur (Scalar)",
            "threads": 1,
            "serialTime": 0.137,
            "parallelTime": 0.158,
            "speedup": 0.867089,
            "efficiency": 0.867089
        },
        {
            "filter": "Gaussian Blur (Scalar)",
            "threads": 2,
            "serialTime": 0.137,
            "parallelTime": 0.0930002,
            "speedup": 1.47312,
            "efficiency": 0.736558
        },
        {
            "filter": "Gaussian Blur (Scalar)",
            "threads": 4,
            "serialTime": 0.137,
            "parallelTime": 0.0509999,
            "speedup": 2.68628,
            "efficiency": 0.671571
        },
        {
            "filter": "Gaussian Blur (Scalar)",
            "threads": 8,
            "serialTime": 0.137,
            "parallelTime": 0.039,
            "speedup": 3.51282,
            "efficiency": 0.439102
        },
        {
            "filter": "Gaussian Blur (Scalar)",
            "threads": 16,
            "serialTime": 0.137,
            "parallelTime": 0.03,
            "speedup": 4.56667,
            "efficiency": 0.285417
        },
        {
            "filter": "Gaussian Blur (Tiled 64x64)",
            "threads": 1,
            "serialTime": 0.152,
            "parallelTime": 0.142,
            "speedup": 1.07042,
            "efficiency": 1.07042
        },
        {
            "filter": "Gaussian Blur (Tiled 64x64)",
            "threads": 2,
            "serialTime": 0.152,
            "parallelTime": 0.079,
            "speedup": 1.92405,
            "efficiency": 0.962027
        },
        {
            "filter": "Gaussian Blur (Tiled 64x64)",
            "threads": 4,
            "serialTime": 0.152,
            "parallelTime": 0.039,
            "speedup": 3.89744,
            "efficiency": 0.974359
        },
        {
            "filter": "Gaussian Blur (Tiled 64x64)",
            "threads": 8,
            "serialTime": 0.152,
            "parallelTime": 0.0289998,
            "speedup": 5.24142,
            "efficiency": 0.655178
        },
        {
            "filter": "Gaussian Blur (Tiled 64x64)",
            "threads": 16,
            "serialTime": 0.152,
            "parallelTime": 0.023,
            "speedup": 6.6087,
            "efficiency": 0.413044
        },
        {
            "filter": "Inversion (Scalar)",
            "threads": 1,
            "serialTime": 0.00200009,
            "parallelTime": 0.000999928,
            "speedup": 2.00024,
            "efficiency": 2.00024
        },
        {
            "filter": "Inversion (Scalar)",
            "threads": 2,
            "serialTime": 0.00200009,
            "parallelTime": 0.00100017,
            "speedup": 1.99976,
            "efficiency": 0.999881
        },
        {
            "filter": "Inversion (Scalar)",
            "threads": 4,
            "serialTime": 0.00200009,
            "parallelTime": 0.0,
            "speedup": Infinity,
            "efficiency": Infinity
        },
        {
            "filter": "Inversion (Scalar)",
            "threads": 8,
            "serialTime": 0.00200009,
            "parallelTime": 0.0,
            "speedup": Infinity,
            "efficiency": Infinity
        },
        {
            "filter": "Inversion (Scalar)",
            "threads": 16,
            "serialTime": 0.00200009,
            "parallelTime": 0.000999928,
            "speedup": 2.00024,
            "efficiency": 0.125015
        },
        {
            "filter": "Inversion (AVX2 SIMD)",
            "threads": 1,
            "serialTime": 0.0,
            "parallelTime": 0.000999928,
            "speedup": 0.0,
            "efficiency": 0.0
        },
        {
            "filter": "Inversion (AVX2 SIMD)",
            "threads": 2,
            "serialTime": 0.0,
            "parallelTime": 0.0,
            "speedup": NaN,
            "efficiency": NaN
        },
        {
            "filter": "Inversion (AVX2 SIMD)",
            "threads": 4,
            "serialTime": 0.0,
            "parallelTime": 0.0,
            "speedup": NaN,
            "efficiency": NaN
        },
        {
            "filter": "Inversion (AVX2 SIMD)",
            "threads": 8,
            "serialTime": 0.0,
            "parallelTime": 0.0,
            "speedup": NaN,
            "efficiency": NaN
        },
        {
            "filter": "Inversion (AVX2 SIMD)",
            "threads": 16,
            "serialTime": 0.0,
            "parallelTime": 0.0,
            "speedup": NaN,
            "efficiency": NaN
        },
        {
            "filter": "Grayscale",
            "threads": 1,
            "serialTime": 0.000999928,
            "parallelTime": 0.000999928,
            "speedup": 1.0,
            "efficiency": 1.0
        },
        {
            "filter": "Grayscale",
            "threads": 2,
            "serialTime": 0.000999928,
            "parallelTime": 0.00100017,
            "speedup": 0.999762,
            "efficiency": 0.499881
        },
        {
            "filter": "Grayscale",
            "threads": 4,
            "serialTime": 0.000999928,
            "parallelTime": 0.000999928,
            "speedup": 1.0,
            "efficiency": 0.25
        },
        {
            "filter": "Grayscale",
            "threads": 8,
            "serialTime": 0.000999928,
            "parallelTime": 0.0,
            "speedup": Infinity,
            "efficiency": Infinity
        },
        {
            "filter": "Grayscale",
            "threads": 16,
            "serialTime": 0.000999928,
            "parallelTime": 0.000999928,
            "speedup": 1.0,
            "efficiency": 0.0625
        },
        {
            "filter": "Sepia tone",
            "threads": 1,
            "serialTime": 0.00300002,
            "parallelTime": 0.00300002,
            "speedup": 1.0,
            "efficiency": 1.0
        },
        {
            "filter": "Sepia tone",
            "threads": 2,
            "serialTime": 0.00300002,
            "parallelTime": 0.00199986,
            "speedup": 1.50012,
            "efficiency": 0.75006
        },
        {
            "filter": "Sepia tone",
            "threads": 4,
            "serialTime": 0.00300002,
            "parallelTime": 0.000999928,
            "speedup": 3.00024,
            "efficiency": 0.75006
        },
        {
            "filter": "Sepia tone",
            "threads": 8,
            "serialTime": 0.00300002,
            "parallelTime": 0.00100017,
            "speedup": 2.99952,
            "efficiency": 0.37494
        },
        {
            "filter": "Sepia tone",
            "threads": 16,
            "serialTime": 0.00300002,
            "parallelTime": 0.000999928,
            "speedup": 3.00024,
            "efficiency": 0.187515
        },
        {
            "filter": "Sharpening",
            "threads": 1,
            "serialTime": 0.036,
            "parallelTime": 0.0530002,
            "speedup": 0.679243,
            "efficiency": 0.679243
        },
        {
            "filter": "Sharpening",
            "threads": 2,
            "serialTime": 0.036,
            "parallelTime": 0.0379999,
            "speedup": 0.947372,
            "efficiency": 0.473686
        },
        {
            "filter": "Sharpening",
            "threads": 4,
            "serialTime": 0.036,
            "parallelTime": 0.027,
            "speedup": 1.33334,
            "efficiency": 0.333334
        },
        {
            "filter": "Sharpening",
            "threads": 8,
            "serialTime": 0.036,
            "parallelTime": 0.0210001,
            "speedup": 1.71427,
            "efficiency": 0.214284
        },
        {
            "filter": "Sharpening",
            "threads": 16,
            "serialTime": 0.036,
            "parallelTime": 0.0179999,
            "speedup": 2.00001,
            "efficiency": 0.125001
        },
        {
            "filter": "Sobel Edges",
            "threads": 1,
            "serialTime": 0.0780001,
            "parallelTime": 0.11,
            "speedup": 0.709091,
            "efficiency": 0.709091
        },
        {
            "filter": "Sobel Edges",
            "threads": 2,
            "serialTime": 0.0780001,
            "parallelTime": 0.0799999,
            "speedup": 0.975002,
            "efficiency": 0.487501
        },
        {
            "filter": "Sobel Edges",
            "threads": 4,
            "serialTime": 0.0780001,
            "parallelTime": 0.0439999,
            "speedup": 1.77273,
            "efficiency": 0.443183
        },
        {
            "filter": "Sobel Edges",
            "threads": 8,
            "serialTime": 0.0780001,
            "parallelTime": 0.0379999,
            "speedup": 2.05264,
            "efficiency": 0.25658
        },
        {
            "filter": "Sobel Edges",
            "threads": 16,
            "serialTime": 0.0780001,
            "parallelTime": 0.03,
            "speedup": 2.6,
            "efficiency": 0.1625
        }
    ]
};
